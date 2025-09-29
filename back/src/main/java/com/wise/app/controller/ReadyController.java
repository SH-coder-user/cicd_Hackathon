// back/src/main/java/com/wise/app/controller/ReadyController.java
package com.wise.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReadyController {
    @GetMapping("/ready")
    public String ready() { return "ok"; }  // HTTP 200
}

