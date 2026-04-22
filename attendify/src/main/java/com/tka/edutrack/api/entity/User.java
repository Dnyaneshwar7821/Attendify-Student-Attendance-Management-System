package com.tka.edutrack.api.entity;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class User {

    @Id
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private String firstName;
    private String lastName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String role;   // admin / faculty
    
    private boolean active = true;
    
}