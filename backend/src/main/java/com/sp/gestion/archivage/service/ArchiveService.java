package com.sp.gestion.archivage.service;


import com.sp.gestion.archivage.model.ArchiveRepository;
import com.sp.gestion.archivage.schema.ArchiveResponse;
import com.sp.gestion.archivage.schema.ArchiveValeurResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArchiveService {
    private final ArchiveRepository archiveRepository;

    public List<ArchiveResponse> getAllArchives() {
        return this.archiveRepository.findAll()
                .stream()
                .map(archive -> ArchiveResponse.builder()
                        .dateArchive(archive.getDateArchive())
                        .type(archive.getType().getLibelle())
                        .totalValeurs((archive.getValeurs().size()))
                        .archivist(archive.getArchivist().getUsername())
                        .build())
                .toList();
    }
}
