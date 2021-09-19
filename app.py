from flask import Flask, render_template, request, session, flash
from flask_wtf import FlaskForm
from wtforms import TextField,TextAreaField, SubmitField, BooleanField, RadioField, SelectField
from wtforms import validators
from wtforms.validators import DataRequired
from flask_bootstrap import Bootstrap

import pandas as pd
import altair as alt

app = Flask(__name__) # Set name of the app.
app.config['SECRET_KEY'] = 'mykey'

#*Render Template
@app.route('/')
def home():
    return render_template("home.html")

@app.route('/d3')
def d3():
    data = [ 35, 21, 38, 77, 32, 44, 47, 80, 37, 50, 62, 49, 92, 63, 62, 72, 63, 157, 83, 65, 103, 90, 87, 183, 86, 109, 108, 95, 72, 92]
    return render_template("d3.html",mydata=data)

@app.route("/altair")
def altair():
    return render_template("altair.html")

#*Altair Plot
@app.route('/altair/scatter')
def altair_plot():
    #* Load Data
    url = "https://gist.githubusercontent.com/puripant/857f1981667e8b42da2c72328ba94ead/raw/296d212615ab076254da03573f8f2493007cc76c/medals.csv"
    df = pd.read_csv(url)
    #* Set drop down list
    input_dropdown = alt.binding_select(options=df.name.unique())
    selection = alt.selection_single(fields=['name'], bind=input_dropdown, name='Country')
    #* Color Settings
    color = alt.condition(selection,
                        alt.Color('name:N', legend=None),
                        alt.value('lightgray'))
    #* Chart Plot
    plot_data = alt.Chart(df).transform_filter(alt.datum.gold > 0).mark_point(size=50,clip=True ).encode(
                        x='year:N',
                        y='gold:Q',
                        color=color,
                        fill=color,
                        tooltip=['name:N','gold:Q'] 
                    ).add_selection(
                        selection
                    ).properties(
                        width='container',
                        height=400
                )
    return plot_data.to_json()

if __name__=='__main__':
    app.run()
