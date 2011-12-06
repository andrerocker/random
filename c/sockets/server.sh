#/bin/bash
system=$(uname -s)
port=1337

if [[ $system == "Linux" ]]
then
  # Possivel GNU Netcat \o/
  echo "starting with gnu params"
  nc -v -l -p $port -q 1 < client.c
else
  # Possivel BSD Netcat :(
  echo "starting with bsd params"
  nc -l $port < client.c
fi
