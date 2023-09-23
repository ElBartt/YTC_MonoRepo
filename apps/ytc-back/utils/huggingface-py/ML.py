from transformers import pipeline, AutoTokenizer

class ML:
    def __init__(self):
        self.modelName  = "facebook/bart-large-mnli"
        self.classifier = pipeline("zero-shot-classification", model=self.modelName)
        self.tokenizer  = AutoTokenizer.from_pretrained(self.modelName)
        self.categories = ['video games', 'sports', 'music', 'news', 'movies', 'cooking', 'travel', 'education', 'fashion', 'beauty']

    def predict(self, text, hypothesis):
        try:
            prediction = self.classifier(text, self.categories, hypothesis=hypothesis)
            return prediction['labels'][0]
        except Exception as e:
            print(f"Error predicting category for text '{text}': {e}")
            return None

    def predict_batch(self, texts, hypothesis):
        try:
            predictions = self.classifier(texts, self.categories, hypothesis=hypothesis)
            return [prediction['labels'][0] for prediction in predictions]
        except Exception as e:
            print(f"Error predicting categories for texts '{texts}': {e}")
            return None
    
ml = ML()

print(ml.predict("I love to play video games", "this review is about {}"))
print(ml.predict_batch(["I love to play video games", "I love to watch sports", "I love to play video games and watch sports"]))
