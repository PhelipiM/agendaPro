package com.agendapro.catalog;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatalogServiceRepository extends JpaRepository<CatalogService, UUID> {

  List<CatalogService> findAllByActiveTrueOrderByNameAsc();
}
