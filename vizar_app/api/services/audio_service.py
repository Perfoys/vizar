import wave
 
nchannels = 1
sampwidth = 1
framerate = 8000
nframes = 1

def convertToAudio(blob):
    name = 'output.wav'
    audio = wave.open(name, 'wb')
    audio.setnchannels(nchannels)
    audio.setsampwidth(sampwidth)
    audio.setframerate(framerate)
    audio.setnframes(nframes)

    audio.writeframes(blob)



