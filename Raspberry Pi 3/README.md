How To Run Hog Trap
===============
Download the code files into your pi. They need to be in the same folder. Note the [absolute path](https://www.linux.com/tutorials/absolute-path-vs-relative-path-linuxunix/) to the folder where the files are placed. Install the dependencies required by typing this in the terminal:
    
    sudo pip install python-socketio

Change the working directory of the terminal to where your files are placed:

    cd [Path of the Folder Here]

Open the file `HogTrap.sh` and change "/home/pi/Desktop" of the following line to the absolute path of the folder:

    workDir=/home/pi/Desktop


Change the permission of the shell file to be executable:

    sudo chmod +x HogTrap.sh

Finally, type in this command to start running the program:

    nohup ./HogTrap.sh < /dev/zero &> HogTrapShell.log &

Make the Program Run At Startup
---
Follow all the steps from the start to changing the permission of the file (if you still haven't). Type the following command:

    sudo nano /etc/rc.local

Add this line before the line `exit 0`:

    nohup [Absolute Path]/HogTrap.sh < /dev/zero &> [Absolute Path]/HogTrapShell.log &

(Substitute [Absolute Path] with the absolute path of the folder. For example, `[Absolute Path]/HogTrap.sh` will be similar to `/home/pi/Desktop/HogTrap.sh`.) Exit the file with `Ctrl` + `X` and finally reboot the pi.

Log Files
---
Two log files will be generated. The first one, `HogTrap.log`, will have the logs of the python file `HogTrap.py`. The second one, `HogTrapShell.log`, will have the output from the shell file `HogTrap.sh`.
