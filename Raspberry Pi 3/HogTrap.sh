#!/bin/bash

start_time=`date +%s`
setsid python3 HogTrap.py < /dev/zero &> HogTrapPy.log &
wait
end_time=`date +%s`
echo Exited after `expr $end_time - $start_time` s.
