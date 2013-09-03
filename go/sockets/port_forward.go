package main

// Redireciona todo trafego da porta X para porta Y
// Não tenho certeza mas possivelmente essa implementação pode conter bugs (leaks de fds de rede)

// Ex:
// go run port_forward.go
// ssh localhost -p 2222

import (
    "io"
    "net"
)

func main() {
    local, _ := net.Listen("tcp", "127.0.0.1:2222")

    for {
        local, _ := local.Accept()

        go func(){
            remote, _ := net.Dial("tcp", "127.0.0.1:22")
            go io.Copy(local, remote)
            go io.Copy(remote, local)
        }()
    }
}
