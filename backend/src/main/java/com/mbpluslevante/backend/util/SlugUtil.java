package com.mbpluslevante.backend.util;

import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

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

    /**
     * Collision key: letters and digits only. "A180 CDI" and "A180CDI" slugify to
     * "a180-cdi" and "a180cdi" — two URLs for what a search engine reads as the
     * same listing, splitting the ranking signals between them. Comparing on the
     * stripped form makes the second one fall through to a "-2" suffix instead.
     */
    public static String slugKey(String slug) {
        return slug.replaceAll("[^a-z0-9]", "");
    }

    public static String uniqueSlug(String base, Collection<String> existingSlugs) {
        Set<String> taken = existingSlugs.stream()
                .map(SlugUtil::slugKey)
                .collect(Collectors.toSet());

        String candidate = base;
        int counter = 2;
        while (taken.contains(slugKey(candidate))) {
            candidate = base + "-" + counter++;
        }
        return candidate;
    }
}
