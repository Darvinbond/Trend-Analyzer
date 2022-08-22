import json
from django.shortcuts import render
import pandas as pd
from django.http import JsonResponse
import pickle
from pathlib import Path
import os

import numpy as np
import pandas as pnd
import matplotlib.pyplot as plt
from matplotlib.pyplot import figure
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from sklearn.preprocessing import StandardScaler
import random
from datetime import datetime
from dateutil.relativedelta import relativedelta




def Upload(request):
    if request.method == 'GET':
      # s = dict(enumerate(['book', 'cup', 'table', 'stool', 'vincent']))
      # print(s)
      # request.session['columns'] = s
      # try:
      #   del request.session['columns']
      #   del request.session['plot_data']
      #   del request.session['N_plot_data']
      # except:
      #   pass

      return render(request, 'upload.html')
    else:
        data = request.FILES['excel_file']
        # try:
        plot_data = StripData(data, request.POST['name'])
        Oplot = plot_data['config']
        Nplot = plot_data['config_again']
        # dataset = plot_data['dataset']
        # columns = list(dataset.columns)
        # columns = dict(enumerate(columns[1:]))
        # print(plot_data['col'])
        columns = dict(enumerate(list(plot_data['col'])))
        # print(Nplot)
        request.session['columns'] = dict(columns)
        # request.session['plot_data'] = dict(Oplot)
        request.session['N_plot_data'] = dict(Nplot)
        
        # return render(request, 'upload.html', {'status':True, 'data': columns, 'plot_data': dict(Oplot), 'N_plot_data': dict(Nplot)})
        # return JsonResponse({'status':True, 'data': columns, 'plot_data': str(dict(Oplot)), 'N_plot_data': str(dict(Nplot))})
        return JsonResponse({'status':True})
        # except:
        #     return JsonResponse({'status':False})

def StripData(file, name):
  BASE_DIR = Path(__file__).resolve().parent.parent
  # print(BASE_DIR)
  config = pickle.load(open(str(BASE_DIR) + '/models/config.pickle', 'rb'))
  dataset = pnd.read_excel(file)
  dataset = pnd.DataFrame(np.array(dataset)[2:, :], columns=np.array(dataset)[1])
  colm = np.array(dataset.columns[1:])

  # Datasets.objects.create(name=name, data=config)

  config_again = {}
  for cols in config:
    # model = config[cols]['model']
    

    model = LogisticRegression(5)
    checkpoint = torch.load('./models/' + cols.replace(" ", "")+".pth")
    model.load_state_dict(checkpoint)

    new_date_12 = config[cols]['x04']
    
    
    new_date_12[0] = config[cols]['x04'][1] - relativedelta(months=1)

    last_5 = list(config[cols]['y03'])[-5:]

    # new_inp = last_5[:-1]
    pred = []
    # pd = last_5[-1]
    new_inp = None

    for i in range(12):
      if i == 0:
        new_inp = torch.tensor(list(last_5))
      else:
        new_inp = torch.tensor(list(np.array(new_inp.detach())) + pd)

      # print(new_inp)

      out = model(new_inp)
      pd = list(np.array(out.detach()).reshape(-1))

      new_inp = new_inp[1:]

      pred += pd

    config_again[cols] = {'x': "$$".join(np.array(new_date_12, dtype="str")), 'y': "$$".join(np.array(pred, dtype="str"))}

    # Columns.objects.create(name=cols, data=config[cols])
      

  return {'col': colm, 'config': config, 'config_again': config_again}
  # return {'dataset': dataset, 'config_again': config_again}



def get_plot(request):
  BASE_DIR = Path(__file__).resolve().parent.parent
  # print(BASE_DIR)
  config = pickle.load(open(str(BASE_DIR) + '/models/config.pickle', 'rb'))


  name = request.POST['name'].replace(" ", "")

  cnf = config[name] 

  cnf['x04'][0] = cnf['x04'][1] - relativedelta(months=1)
  # plt = request.session.get('plot_data')
  # print(name)
  # for i in config:
  #   if i == name:
  #     data = config[i]

  # print(data)
  # config = pd.DataFrame(np.array(dataset)[2:, :], columns=np.array(dataset)[1])
  plot_data = dict(cnf)
  # print(plot_data)

  for i in plot_data:
    # print(i)
    plot_data[i] = "$$".join(np.array(plot_data[i], dtype="str"))

  # return JsonResponse({'status':True, 'x01': list(plot_data['x01']), 'y01': list(plot_data['y01']),'x02': list(plot_data['x02']), 'y02': list(plot_data['y02']),'x03': list(plot_data['x03']),'y03': list(plot_data['y03']),'x04': list(plot_data['x04']),'y04': list(plot_data['y04'])})

  return JsonResponse({'status':True, 'initials': plot_data})






####################################################################################

class LogisticRegression(nn.Module):
  def __init__(self, n_input_features):
    super(LogisticRegression, self).__init__()

    self.linear1 = nn.Linear(n_input_features, 1)
    # self.linear2 = nn.Linear(3, 1)

  def forward(self, x):
    y_pred = self.linear1(x)
    # y_pred = self.linear2(y_pred)
    return y_pred

  