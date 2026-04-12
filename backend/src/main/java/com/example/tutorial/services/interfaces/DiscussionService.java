package com.example.tutorial.services.interfaces;

import com.example.tutorial.models.Discussion;
import java.util.List;

public interface DiscussionService {
    Discussion addDiscussionToProblem(Long problemId, Discussion discussion);
    List<Discussion> getDiscussionsForProblem(Long problemId);
    Discussion replyToDiscussion(Long discussionId, Discussion reply);
}