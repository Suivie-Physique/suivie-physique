package com.sp.gestion.archivage.controller;


import com.sp.gestion.archivage.schema.ArchiveResponse;
import com.sp.gestion.archivage.service.ArchiveService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/archive")
@RequiredArgsConstructor
public class ArchiveController {

    private final ArchiveService archiveService;

    @GetMapping("/all")
    public ResponseEntity<List<ArchiveResponse>> getAllArchives() {
        return ResponseEntity.ok(this.archiveService.getAllArchives());
    }

}
