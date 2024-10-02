import java.io.*;
import java.net.*;
public class ChatClient {
public static void main(String args[]) {
try {
InetAddress serverAddress = InetAddress.getLocalHost();
Socket s = new Socket(serverAddress, 300);
System.out.println("Chat Client is Ready:");
BufferedReader serverInput = new BufferedReader(new
InputStreamReader(s.getInputStream()));
PrintStream ps = new PrintStream(s.getOutputStream());
BufferedReader userInput = new BufferedReader(new
InputStreamReader(System.in));
while (true) {
System.out.print("Client: ");
String clientMessage = userInput.readLine();
ps.println("Client Message: " + clientMessage);
String serverMessage = serverInput.readLine();
System.out.println("Server: " + serverMessage);
}
} catch (IOException e) {
e.printStackTrace();
}
}
}