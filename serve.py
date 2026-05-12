import http.server, os
os.chdir("/Users/irisescudero/Desktop/sp-tester-v2-chatgpt")
server = http.server.HTTPServer(("", 8081), http.server.SimpleHTTPRequestHandler)
server.serve_forever()
