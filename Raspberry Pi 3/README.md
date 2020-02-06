How To Run Hog Trap
===============
Type in this command in the terminal of the Raspberry Pi 3:
    
    nohup ./HogTrap.sh < /dev/zero &> HogTrapShell.log &

Log Files
---
Two log files will be generated. The first one, `HogTrap.log`, will have the logs of the python file `HogTrap.py`. The second one, `HogTrapShell.log`, will have the output from the shell file `HogTrap.sh`.
