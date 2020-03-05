#!/bin/bash

numTry=0
runtimes=(1000 1000 1000)
delayMinutes=1
workDir=/home/pi/Desktop/
sleep 15

while :
do
  ((numTry=numTry+1))
  start_time=`date +%s`
  if [ $numTry -eq 1 ]
  then
    setsid python3 ${workDir}HogTrap.py < /dev/zero &> ${workDir}HogTrap.log &
  else
    setsid python3 ${workDir}HogTrap.py < /dev/zero &>> ${workDir}HogTrap.log &
  fi
  wait
  end_time=`date +%s`
  (((index=numTry - 1) % 3))
  runtimes[$index]=`expr $end_time - $start_time`
  if (( $numTry % 10 == 1)) || (( $numTry % 10 == 2)) || (( $numTry % 10 == 3))
  then
    if (( $numTry % 100 == 11)) || (( $numTry % 100 == 12)) || (( $numTry % 100 == 13))
    then
      echo Exited ${numTry}th try after ${runtimes[$index]} s.
    else
      if (( $numTry % 10 == 1))
      then
        echo Exited ${numTry}st try after ${runtimes[$index]} s.
      elif (( $numTry % 10 == 2))
      then
        echo Exited ${numTry}nd try after ${runtimes[$index]} s.
      else
        echo Exited ${numTry}rd try after ${runtimes[$index]} s.
      fi
    fi  
  else
    echo Exited ${numTry}th try after ${runtimes[$index]} s.
  fi
  if [ `echo ${runtimes[@]/%/+}0 | bc` -lt 300 ]
  then
    sleep ${delayMinutes}m
  fi
done