const URL = `http://localhost:8000`;

const COMMON_HEADERS = { 'Content-Type': 'application/json' };

export class APIDatabase {
  static async get(id) {
    const res = await fetch(`http://localhost:8000/dataset/${id}`, {
      method: 'GET'
    });
    const body = await res.json();
    return body;
  }

  static async getAll() {
    const res = await fetch(`http://localhost:8000/dataset/`, {
      method: 'GET'
    });
    const body = await res.json();
    return body;
  }

  static async drop(dropColumns) {
    await fetch(`${URL}/dataset/drop`, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify({ columnsToRemove: dropColumns })
    });
  }

  static async oneHotEncoding(oneHotColumns, data) {
    const response = await fetch(`${URL}/dataset/one_hot_encoding/`, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify({
        columns: oneHotColumns,
        data: data
      })
    });
    const body = await response.json();
    return body;
  }

  static async download(fileType) {
    const res = await fetch(`${URL}/dataset/download/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file_type: fileType
      })
    });
    const data = await res.blob();
    return data;
  }
}
