#!/usr/bin/env python3
"""
    Demo for SimpleSebSocketServer, implemeneted as an echo server.
    By dpallot: https://github.com/dpallot/simple-websocket-server/blob/master/README.md
"""
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

class SimpleEcho(WebSocket):

    def handleMessage(self):
        # echo message back to client
        self.sendMessage(self.data)

    def handleConnected(self):
        print(self.address, 'connected')

    def handleClose(self):
        print(self.address, 'closed')

server = SimpleWebSocketServer('', 8080, SimpleEcho)
try:
    server.serveforever()
except KeyboardInterrupt:
    print("Exiting.")
