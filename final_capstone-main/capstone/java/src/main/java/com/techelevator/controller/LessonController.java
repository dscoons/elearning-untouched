package com.techelevator.controller;

import com.techelevator.dao.LessonDao;
import com.techelevator.dao.UserDao;
import com.techelevator.model.Lesson;
import com.techelevator.model.LessonDTO;
import com.techelevator.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
@RestController
@CrossOrigin

@PreAuthorize("isAuthenticated()")
public class LessonController {
    @Autowired
    private LessonDao lessonDao;
    @Autowired
    private UserDao userDao;

    @GetMapping("/courses/{id}/lessons")
    public List<Lesson> showLessons(@Valid @PathVariable int id, Principal p) {
        User user = userDao.findByUsername(p.getName());
        // pass user id?
        return lessonDao.getLessonsByCourseId(id);
    }

    @GetMapping("/courses/{courseId}/lessons/{lessonId}")
    public Lesson getLesson(@PathVariable int courseId, @PathVariable int lessonId) {
        return lessonDao.getLessonByIdAndCourseId(lessonId, courseId);
    }

    @GetMapping("/lessons/{lessonId}")
    public Lesson getLesson(@PathVariable int lessonId) {
        return lessonDao.getLessonById(lessonId);
    }

    @GetMapping("/courses/{courseId}/modules/{moduleId}/lessons")
    public List<Lesson> getLessonsByModule(@PathVariable int courseId, @PathVariable int moduleId) {
        return lessonDao.getLessonsByModule(moduleId, courseId);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/courses/{courseId}/modules/{moduleId}/lessons")
    public Lesson createLesson(@Valid @PathVariable int courseId, @PathVariable int moduleId, @RequestBody LessonDTO newLesson) {
        newLesson.setModuleId(moduleId);
        return lessonDao.createLesson(newLesson);
    }

}
