package com.soum.civikConnect.moderator.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record issueIntRes(
        Long issueId,
        String title,
        Long ngoId,
        String ngoName,
        String state,
        LocalDateTime time
) {
}
