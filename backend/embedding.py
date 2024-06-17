from transformers import AutoTokenizer, AutoModel
import torch

tokenizer = AutoTokenizer.from_pretrained("soketlabs/pragna-1b")
model = AutoModel.from_pretrained("soketlabs/pragna-1b")

def generate_embedding(text: str) -> List[float]:
    inputs = tokenizer(text, return_tensors="pt")
    with torch.no_grad():
        embedding = model(**inputs).last_hidden_state.mean(dim=1).squeeze()
    return embedding.tolist()
