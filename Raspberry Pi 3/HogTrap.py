import socketio,time,base64, urllib3, socket
import RPi.GPIO as GPIO

start_time = time.time()

GPIO.setmode(GPIO.BOARD)

latch = 7
GPIO.setup(latch, GPIO.OUT)
GPIO.output(latch, GPIO.LOW)

sio=socketio.Client(True, logger=True)

sio.connect("https://dit-hog-trap.glitch.me")

http = urllib3.PoolManager()

@sio.event
def trapIsOnline(TrapIsOnline):
    if not TrapIsOnline:
        sio.emit("identify",{"name":"hogTrap"})

@sio.event
def activateTrap(data):
    '''Activate Trap'''
    for x in range(20):
        GPIO.output(latch, GPIO.HIGH)
        time.sleep(0.1)
        GPIO.output(latch, GPIO.LOW)
        time.sleep(0.1)
    sio.emit("trapActivated","Trap has been activated.")

@sio.event
def updatePic(data):
    '''send latest pic'''
    ipAdd = socket.gethostbyname(socket.gethostname())
    response = http.request('GET', 'http://'+ipAdd+':8765/picture/1/current')
    camPic = base64.b64encode(response.data).decode()
    sio.emit("image", {"type": "jpeg","data":camPic,"socketid":data["socketid"]})

sio.wait()
GPIO.cleanup()
print("--- %s seconds ---" % (time.time() - start_time))
