import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashingExample {

    public static void main(String[] args) {
        String input = "Hello, World!";
        String hashedValue = hashInput(input);
        System.out.println("Input: " + input);
        System.out.println("Hashed Value (SHA-256): " + hashedValue);
    }

    public static String hashInput(String input) {
        try {
            // Create a MessageDigest instance for SHA-256
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            // Perform the hashing
            byte[] hashBytes = digest.digest(input.getBytes());
            // Convert byte array to hex string
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
