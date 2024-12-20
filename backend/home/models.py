from django.db import models
import uuid

class BaseModel(models.Model):
    uuid = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
   
    class Meta:
        abstract = True

class Category(BaseModel):
    category_name = models.CharField(max_length = 100)
    def __str__(self):
        return self.category_name

class Question(BaseModel):
    category = models.ForeignKey(Category, on_delete = models.CASCADE)
    question = models.CharField(max_length = 100)
    marks = models.IntegerField(default = 1)
    def __str__(self):
        return self.question
    def get_answer(self):
        ans = list(Answer.objects.filter(question = self))
        data = []
        for a in ans:
            data.append({
                "answer" : a.answer,
                "is_correct" : a.is_correct
            })
        return data

class Answer(BaseModel):
    question = models.ForeignKey(Question, on_delete = models.CASCADE)
    answer = models.CharField(max_length = 100)
    is_correct = models.BooleanField(default = False)
    def __str__(self):
        return self.answer


