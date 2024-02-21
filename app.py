from flask import Flask , render_template , request, jsonify

import pandas as pd
import numpy as np
import pickle
app = Flask(__name__)


model=pickle.load(open('books_model.pkl','rb'))
data=pd.read_csv('final_data.csv',index_col=0)
books=pd.read_csv('final_books.csv',sep=';',index_col=[0])


def recommend_books(b_title):
    bid=np.where(data.index==b_title)[0][0]
#     print(bid)
    distance,suggestions=model.kneighbors(data.iloc[bid,:].values.reshape(1,-1),n_neighbors=6)
    print(distance)
    b_title=[]
    for i in suggestions[0][1:]:
        b_title.append(data.index[i])
    return books[books.title.isin(b_title)] 
    

@app.route("/")
def index():
    b=np.array(books.sort_values('title'))
    return render_template('index.html',title='Book Recommendation',b=b)


# Add this route to your app.py
@app.route('/search', methods=['POST'])
def search():
    query = request.form['query']
    suggestions = books[books['title'].str.contains(query, case=False, na=False)].head(5).to_json(orient='records')
    return jsonify(suggestions)


@app.route("/book/<title>")
def pred(title):    
    book=recommend_books(title)
    b=np.array(book.sort_values('title'))
    b_self=np.array(books[books.title==title])
    print(b_self)
    return render_template('book.html',title=title,b=b,b_self=b_self)



if __name__=="__main__":
    app.run(debug=True)