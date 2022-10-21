# Binaural Beats Generator
# Author: Alexander Lee

import threading
import time
import numpy as np

from scipy import signal
import sounddevice as sd

def sample_function(volume, fs, duration, frequency):
    sample = (np.sin(2 * np.pi * np.arange(fs * duration) * frequency / fs)).astype(np.float32)
    return sample


def thread_function(sample,index):
    sd.play(sample, samplerate=44100, mapping=[index])


if __name__ == "__main__":

    volume = 0.5
    fs = 44100

    print('Beats duration:')
    duration = int(input())

    frequency_left = 200.0
    sample_left = sample_function(volume,fs,duration,frequency_left)

    frequency_right = 215.0
    sample_right = sample_function(volume,fs,duration,frequency_right)

    threads = list()

    x = threading.Thread(target=thread_function, args=(sample_left,1,))
    threads.append(x)
    x.start()

    x = threading.Thread(target=thread_function, args=(sample_right,2,))
    threads.append(x)
    x.start()
    
    print("Left Headphone: %d hz | Right Headphone: %d hz" % (frequency_left, frequency_right))
    time.sleep(duration +1)
