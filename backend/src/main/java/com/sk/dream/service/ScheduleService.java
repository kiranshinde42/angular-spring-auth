package com.sk.dream.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sk.dream.dto.SeriesDto;
import com.sk.dream.entity.Schedule;
import com.sk.dream.repository.ScheduleRepository;

import jakarta.validation.Valid;

@Service
public class ScheduleService {
	
	@Autowired
	ScheduleRepository scheduleRepository;
	
	@Autowired
    private ModelMapper modelMapper; 

	public void registerSeries(@Valid SeriesDto seriesDto) {
		Schedule userDto = this.modelMapper.map(seriesDto, Schedule.class); 
		scheduleRepository.save(userDto);		
	}

	public List<Schedule> getSeries() {
		return scheduleRepository.findAll();
	}
}
