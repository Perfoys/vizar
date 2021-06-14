from time import ctime
import webbrowser


def Respond(text):
    if "hello" in text:
        return "hello user! welcome to the Vizar App"

def timeRespond():
    return ctime()


def searchRespond(search):
    url = "https://google.com/search?q=" + search
    webbrowser.get().open(url)
    print('Here is what I found for ' + search)