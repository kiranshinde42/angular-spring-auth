package com.sk.dream.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sk.dream.dto.SeriesDto;
import com.sk.dream.entity.Schedule;
import com.sk.dream.exception.CommonException;
import com.sk.dream.service.ScheduleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class ScheduleController {
	
	@Autowired
	ScheduleService scheduleService;
	
	@PostMapping("/schedule/register")
    public ResponseEntity<Void> registerSeries(@Valid @RequestBody SeriesDto seriesDto) {
		scheduleService.registerSeries(seriesDto);
		return new ResponseEntity<>(HttpStatus.OK);
    }
	
	@GetMapping("/schedule")
    public ResponseEntity<List<Schedule>> getSeries() throws CommonException{
		List<Schedule> series = scheduleService.getSeries();
		return new ResponseEntity<>(series, HttpStatus.OK);
    }
}
