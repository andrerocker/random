#include <stdio.h>
#include <netdb.h>
#include <string.h>
#include <stdlib.h>

#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define MAX_DATA_SIZE 1024

int connect_socket() {
  int sock = socket(AF_INET, SOCK_STREAM, 0);
  check_error(sock, "problemas ao criar socket");

  struct sockaddr_in sock_struct;
  sock_struct.sin_family = AF_INET;
  sock_struct.sin_port = htons(1337);

  struct hostent *he = gethostbyname("localhost");
  sock_struct.sin_addr = *((struct in_addr *) he->h_addr);
  bzero(&sock_struct.sin_zero, 8);

  int conn = connect(sock, (struct sockaddr *) &sock_struct, sizeof(sock_struct));
  check_error(conn, "problemas ao se conectar no server");

  return sock;
}

int receive_all_data(int fd) {
  char buffer[MAX_DATA_SIZE];
  int read_bytes;

  while(1) {
    read_bytes = recv(fd, buffer, MAX_DATA_SIZE, 0);
    buffer[read_bytes] = '\0';
    printf("%s", buffer);
  }
}

int check_error(int fd, char *msg) {
  if (fd < 0) {
    perror(msg);
    exit(1);
  }
}

int main(int argc, char **argv) {
  int sock = connect_socket();
  receive_all_data(sock);
  return 0;
}
