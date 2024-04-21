package com.sp.exception.code;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum BusinessErrorCode {

    NO_CODE(0, "No code", HttpStatus.NOT_IMPLEMENTED),
    INCORRECT_CURRENT_PASSWORD(1, "Incorrect current password", HttpStatus.BAD_REQUEST),

    NEW_PASSWORD_MISMATCH(2, "New password mismatch", HttpStatus.BAD_REQUEST),
    ACCOUNT_DISABLED(3, "User Account is disabled", HttpStatus.FORBIDDEN),
    BAD_CREDENTIALS(4, "Bad credentials ", HttpStatus.FORBIDDEN),
    ACCOUNT_LOCKED(5, "User Account is locked", HttpStatus.FORBIDDEN);

    @Getter
    private final int code;
    @Getter
    private final String description;
    @Getter
    private final HttpStatus httpStatus;

    BusinessErrorCode(int code, String description, HttpStatus httpStatus) {
        this.code = code;
        this.description = description;
        this.httpStatus = httpStatus;
    }
}
