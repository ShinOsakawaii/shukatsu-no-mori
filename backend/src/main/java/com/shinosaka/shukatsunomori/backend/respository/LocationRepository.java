package com.shinosaka.shukatsunomori.backend.respository;

import com.shinosaka.shukatsunomori.backend.domain.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByCity(String City);
}
