import com.krvy.emomgr.controller.UserController;
import com.krvy.emomgr.database.User;
import com.krvy.emomgr.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.sql.Date;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private User testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setPassword("password123");
        testUser.setAvatar("avatar.jpg");
        testUser.setSex(1);
        testUser.setAge(25);
        testUser.setCreateTime(new Date(System.currentTimeMillis()));
        testUser.setUpdateTime(new Date(System.currentTimeMillis()));
    }

    @Test
    void getAllUsers_ShouldReturnAllUsers() {
        // Arrange
        List<User> users = Arrays.asList(testUser, new User());
        when(userService.findAll()).thenReturn(users);

        // Act
        ResponseEntity<List<User>> response = userController.getAllUsers();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(users, response.getBody());
        assertEquals(2, response.getBody().size());
        verify(userService, times(1)).findAll();
    }

    @Test
    void getAllUsers_WhenNoUsers_ShouldReturnEmptyList() {
        // Arrange
        when(userService.findAll()).thenReturn(Collections.emptyList());

        // Act
        ResponseEntity<List<User>> response = userController.getAllUsers();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isEmpty());
        verify(userService, times(1)).findAll();
    }

    @Test
    void getAllUsers_WhenServiceThrowsException_ShouldPropagateException() {
        // Arrange
        when(userService.findAll()).thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userController.getAllUsers();
        });

        assertEquals("Database error", exception.getMessage());
        verify(userService, times(1)).findAll();
    }

    @Test
    void getUserById_WhenUserExists_ShouldReturnUser() {
        // Arrange
        when(userService.findById(anyLong())).thenReturn(Optional.of(testUser));

        // Act
        User result = userController.ResponseEntity(1L);

        // Assert
        assertEquals(testUser, result);
        assertEquals("testuser", result.getUsername());
        assertEquals(25, result.getAge());
        assertEquals(1, result.getSex());
        verify(userService, times(1)).findById(1L);
    }

    @Test
    void getUserById_WhenUserDoesNotExist_ShouldThrowException() {
        // Arrange
        when(userService.findById(anyLong())).thenReturn(Optional.empty());

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userController.ResponseEntity(1L);
        });

        assertEquals("User not found with id: 1", exception.getMessage());
        verify(userService, times(1)).findById(1L);
    }

    @Test
    void getUserById_WhenServiceThrowsException_ShouldPropagateException() {
        // Arrange
        when(userService.findById(anyLong())).thenThrow(new RuntimeException("Database connection error"));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userController.ResponseEntity(1L);
        });

        assertEquals("Database connection error", exception.getMessage());
        verify(userService, times(1)).findById(1L);
    }

    @Test
    void createUser_ShouldReturnCreatedUser() {
        // Arrange
        User inputUser = new User();
        inputUser.setUsername("newuser");
        inputUser.setPassword("newpassword");
        inputUser.setAge(30);
        inputUser.setSex(0);

        when(userService.save(any(User.class))).thenReturn(testUser);

        // Act
        ResponseEntity<User> response = userController.createUser(inputUser);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(testUser, response.getBody());
        verify(userService, times(1)).save(inputUser);
    }

    @Test
    void createUser_WhenSaveThrowsException_ShouldPropagateException() {
        // Arrange
        User inputUser = new User();
        inputUser.setUsername("newuser");

        when(userService.save(any(User.class))).thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userController.createUser(inputUser);
        });

        assertEquals("Database error", exception.getMessage());
        verify(userService, times(1)).save(inputUser);
    }

    @Test
    void createUser_WithNullFields_ShouldAllowNullValuesAndSave() {
        // Arrange
        User inputUser = new User(); // All fields are null
        User savedUser = new User();
        savedUser.setId(1L);

        when(userService.save(any(User.class))).thenReturn(savedUser);

        // Act
        ResponseEntity<User> response = userController.createUser(inputUser);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedUser, response.getBody());
        verify(userService, times(1)).save(inputUser);
    }

    @Test
    void updateUser_WhenUserExists_ShouldReturnUpdatedUser() {
        // Arrange
        User userDetails = new User();
        userDetails.setUsername("updatedUsername");
        userDetails.setAge(35);

        User updatedUser = new User();
        updatedUser.setId(1L);
        updatedUser.setUsername("updatedUsername");
        updatedUser.setAge(35);

        when(userService.update(anyLong(), any(User.class))).thenReturn(updatedUser);

        // Act
        ResponseEntity<User> response = userController.updateUser(1L, userDetails);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedUser, response.getBody());
        assertEquals("updatedUsername", response.getBody().getUsername());
        assertEquals(35, response.getBody().getAge());
        verify(userService, times(1)).update(1L, userDetails);
    }

    @Test
    void updateUser_WhenUserDoesNotExist_ShouldPropagateException() {
        // Arrange
        User userDetails = new User();
        when(userService.update(anyLong(), any(User.class)))
                .thenThrow(new RuntimeException("User not found with id: 999"));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userController.updateUser(999L, userDetails);
        });

        assertEquals("User not found with id: 999", exception.getMessage());
        verify(userService, times(1)).update(999L, userDetails);
    }

    @Test
    void updateUser_WithPartialUpdate_ShouldOnlyUpdateProvidedFields() {
        // Arrange
        User userDetails = new User();
        userDetails.setUsername("newUsername"); // Only updating username

        User updatedUser = new User();
        updatedUser.setId(1L);
        updatedUser.setUsername("newUsername");
        updatedUser.setAge(25); // Unchanged

        when(userService.update(anyLong(), any(User.class))).thenReturn(updatedUser);

        // Act
        ResponseEntity<User> response = userController.updateUser(1L, userDetails);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedUser, response.getBody());
        verify(userService, times(1)).update(1L, userDetails);
    }

    @Test
    void deleteUser_ShouldReturnNoContent() {
        // Arrange
        doNothing().when(userService).deleteById(anyLong());

        // Act
        ResponseEntity<Void> response = userController.deleteUser(1L);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
        verify(userService, times(1)).deleteById(1L);
    }

    @Test
    void deleteUser_WhenIdDoesNotExist_ShouldPropagateException() {
        // Arrange
        doThrow(new RuntimeException("User not found")).when(userService).deleteById(999L);

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userController.deleteUser(999L);
        });

        assertEquals("User not found", exception.getMessage());
        verify(userService, times(1)).deleteById(999L);
    }

    @Test
    void deleteUser_WhenServiceThrowsException_ShouldPropagateException() {
        // Arrange
        doThrow(new RuntimeException("Database connection error")).when(userService).deleteById(anyLong());

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userController.deleteUser(1L);
        });

        assertEquals("Database connection error", exception.getMessage());
        verify(userService, times(1)).deleteById(1L);
    }
}