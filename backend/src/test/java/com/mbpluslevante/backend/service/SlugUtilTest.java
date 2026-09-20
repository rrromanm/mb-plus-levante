package com.mbpluslevante.backend.service;

import com.mbpluslevante.backend.util.SlugUtil;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class SlugUtilTest {

    @Test
    void freeSlugIsUsedAsIs() {
        assertEquals(
                "mercedes-benz-a180cdi-2006",
                SlugUtil.uniqueSlug("mercedes-benz-a180cdi-2006", List.of("bmw-320d-2008"))
        );
    }

    @Test
    void exactDuplicateGetsSuffix() {
        assertEquals(
                "bmw-320d-2008-2",
                SlugUtil.uniqueSlug("bmw-320d-2008", List.of("bmw-320d-2008"))
        );
    }

    /** The real-world case: "A180 CDI" vs "A180CDI" on the same brand and year. */
    @Test
    void nearDuplicateGetsSuffix() {
        assertEquals(
                "mercedes-benz-a180cdi-2006-2",
                SlugUtil.uniqueSlug(
                        "mercedes-benz-a180cdi-2006",
                        List.of("mercedes-benz-a180-cdi-2006")
                )
        );
    }

    @Test
    void suffixCountsUpPastSeveralCollisions() {
        assertEquals(
                "mercedes-benz-a180cdi-2006-3",
                SlugUtil.uniqueSlug(
                        "mercedes-benz-a180cdi-2006",
                        List.of("mercedes-benz-a180-cdi-2006", "mercedes-benz-a180cdi-2006-2")
                )
        );
    }
}
