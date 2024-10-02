import java.io.*;
import java.net.*;
public class ChatServer {
public static void main(String args[]) {
try {
ServerSocket ss = new ServerSocket(300);
System.out.println("Chat Server is Ready:");
Socket s = ss.accept();
System.out.println("Client Connected.");
BufferedReader dis = new BufferedReader(new
InputStreamReader(s.getInputStream()));
PrintStream ps = new PrintStream(s.getOutputStream());
BufferedReader serverInput = new BufferedReader(new
InputStreamReader(System.in));
while (true) {
String clientMessage = dis.readLine();
System.out.println("Client: " + clientMessage);
System.out.print("Server: ");
String serverMessage = serverInput.readLine();
ps.println("Server Message: " + serverMessage);
}
} catch (IOException e) {
e.printStackTrace();
}
}
}