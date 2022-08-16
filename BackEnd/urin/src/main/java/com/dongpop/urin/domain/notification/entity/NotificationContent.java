package com.dongpop.urin.domain.notification.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@AllArgsConstructor
@Getter
public class NotificationContent {
    @NotBlank
    @Size(min = 1, max = 50)
    private String content;
}
