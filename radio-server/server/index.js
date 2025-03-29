import express from "express";
import http from "http";
import {Server as IOServer} from "socket.io";
import queue from "./queue.js";
import path from "path";
import {fileURLToPath} from "url";
import {downloadTracks} from "./loadTracks.js";
import cors from "cors";


const PORT = 55392;
const app = express();
const server = http.createServer(app);
const io = new IOServer(server, {
    cors: {
        origin: "https://stream.radiohit.by",
    },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, "../");

app.use(cors());
app.use(express.static(outputDir));

//Default endpoint
app.get("/", function (req, res) {
    res.sendFile(path.join(outputDir, "index.html"));
});

//Restart server and fetch new tracks
app.get('/restart-radio-server', (req, res) => {
    console.log('Restart and fetch new songs');
    process.exit(1);
});

let allTracksInfo = [];

(async () => {
    await downloadTracks().then(async (tracksInfo) => {
        await queue.loadTracks("tracks");
        allTracksInfo = tracksInfo.reverse();
    })
    queue.play();

    io.on("connection", (socket) => {
        // Every new streamer must receive the header
        if (queue.bufferHeader) {
            socket.emit("bufferHeader", queue.bufferHeader);
        }

        socket.on("bufferHeader", (header) => {
            queue.bufferHeader = header;
            socket.broadcast.emit("bufferHeader", queue.bufferHeader);
        });

        socket.on("stream", (packet) => {
            // Only broadcast microphone if a header has been received
            if (!queue.bufferHeader) return;

            // Audio stream from host microphone
            socket.broadcast.emit("stream", packet);
        });

        socket.on("control", (command) => {
            switch (command) {
                case "pause":
                    queue.pause();
                    break;
                case "resume":
                    queue.resume();
                    break;
            }
        });
    });

    // HTTP stream for music
    app.get("/stream", (req, res) => {
        const { id, client } = queue.addClient();

        res.set({
            "Content-Type": "audio/mpeg",
            "Transfer-Encoding": "chunked",
        }).status(200);

        client.pipe(res);

        req.on("close", () => {
            queue.removeClient(id);
        });
    });

    //Get all songs in queue info
    app.get('/all-tracks-info', (req, res) => {
        const { currentTrackIndex, allTracks } = queue.current();

        res.json({
            currentTrackPlayedIndex: currentTrackIndex - 1,
            allTracksInQueue: allTracks,
            allTracksInfo: allTracksInfo
        })
    });

    //Get current song info
    app.get('/current-track-info', (req, res) => {
        const { currentTrackIndex } = queue.current();

        if(allTracksInfo.length > 0) {
            res.json({
                trackInfo: allTracksInfo[currentTrackIndex - 1],
                playedIndex: currentTrackIndex - 1
            });
        } else {
            res.end();
        }
    });

    //Redirect all 404 requests
    app.use(function (req, res, next) {
        res.redirect('/');
    })

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})();

export {};
