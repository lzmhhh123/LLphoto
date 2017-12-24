import demo, tools, datasets
net = demo.build_convnet()
model = tools.load_model()
train = datasets.load_dataset('f30k', load_train=True)[0]
# vectors = tools.encode_sentences(model, train[0], verbose=False)
import numpy
vectors = numpy.load('vectors_f30k.npy')

import nltk

from demo import compute_features
from scipy.linalg import norm

from nltk.stem import WordNetLemmatizer
wnl = WordNetLemmatizer()

def extract_nouns(sentence):
    # function to test if something is a noun
    print sentence
    is_noun = lambda pos: pos[:2] == 'NN'
    # do the nlp stuff
    tokenized = nltk.word_tokenize(sentence)
    nouns = [word for (word, pos) in nltk.pos_tag(tokenized) if is_noun(pos)]
    if len(str(nouns)) > 100:
        nouns = nouns[:3]
    nouns = [wnl.lemmatize(_.lower()) for _ in nouns]
    return nouns

def get_tags(img, k=3):
    sentences = demo.retrieve_captions(model, net, train[0], vectors, img, k)
    lines = sentences[0] + sentences[1]
    nouns = extract_nouns(lines)
    return {"tags":nouns, "sentence": sentences}
# demo.retrieve_captions(model, net, train[0], vectors, 'image.jpg', k=5)
# def retrieve_captions(img, k=3):
#     """
#     Retrieve captions for a given image
#
#     model: Image-sentence embedding model
#     net: VGG ConvNet
#     captions: list of sentences to search over
#     cvecs: the embeddings for the above sentences
#     file_name: location of the image
#     k: number of sentences to return
#     """
#     captions = train[0]
#     cvecs = vectors
#     # Run image through convnet
#     feats = compute_features(net, img).flatten()
#     feats /= norm(feats)
#
#     # Embed image into joint space
#     feats = tools.encode_images(model, feats[None,:])
#
#     # Compute the nearest neighbours
#     scores = numpy.dot(feats, cvecs.T).flatten()
#     sorted_args = numpy.argsort(scores)[::-1]
#     sentences = [captions[a] for a in sorted_args[:k]]
#     lines = sentences[0] + sentences[1]
#     # function to test if something is a noun
#     is_noun = lambda pos: pos[:2] == 'NN'
#     # do the nlp stuff
#     tokenized = nltk.word_tokenize(lines)
#     nouns = [word for (word, pos) in nltk.pos_tag(tokenized) if is_noun(pos)]
#     return {"tags":nouns, "sentence": sentences}
