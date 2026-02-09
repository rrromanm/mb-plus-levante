package com.mbpluslevante.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ConfigurationProperties(prefix = "app.cookie")
public class CookieProperties {

    private boolean secure;
    private String sameSite;
}

