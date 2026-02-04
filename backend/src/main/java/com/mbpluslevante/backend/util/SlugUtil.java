package com.mbpluslevante.backend.util;

import org.springframework.stereotype.Component;

import java.text.Normalizer;

@Component
public class SlugUtil {

    public static String slugify(String input) {
        return Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "")
                .replaceAll("[^a-zA-Z0-9\\s-]", "")
                .trim()
                .replaceAll("\\s+", "-")
                .replaceAll("-{2,}", "-")
                .toLowerCase();
    }
}
