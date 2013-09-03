from twisted.internet import reactor
from twisted.protocols import portforward

# Encaminha todo o trafego da porta X para a porta Y
# Apenas uma linha pahh!

# Caso de Uso:
#  python port_forward.py
#  twistd ftp
#  ftp localhost 2122

reactor.listenTCP(2122, portforward.ProxyFactory('localhost', 2121))
reactor.run()
