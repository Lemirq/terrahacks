# in this dir, el.csv exists, has columns: id,name,email,created_at. Your job is to split the name into first_name and last_name, and save the result to a new file called el_new.csv
# last name may or exist
import pandas as pd

df = pd.read_csv('el.csv')
df['first_name'] = df['name'].apply(lambda x: x.split()[0])
df['last_name'] = df['name'].apply(lambda x: ' '.join(x.split()[1:]) if len(x.split()) > 1 else None)
df.to_csv('el_new.csv', index=False)
