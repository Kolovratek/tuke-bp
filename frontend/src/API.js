const URL = `http://localhost:8000`;

const COMMON_HEADERS = { 'Content-Type': 'application/json' };

export class APIDatabase {
  static async get(id) {
    const res = await fetch(`${URL}/dataset/${id}`, {
      method: 'GET'
    });
    const body = await res.json();
    return body;
  }

  static async getAll() {
    const res = await fetch(`${URL}/dataset/`, {
      method: 'GET'
    });
    const body = await res.json();
    return body;
  }

  static async drop(dropColumns, id) {
    const res = await fetch(`${URL}/dataset/drop/${id}`, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify({ columnsToRemove: dropColumns, id: id })
    });
    const body = await res.json();
    return body;
  }

  static async oneHotEncoding(oneHotColumns, id) {
    const res = await fetch(`${URL}/dataset/one_hot_encoding/${id}`, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify({
        columns: oneHotColumns,
        id: id
      })
    });
    const body = await res.json();
    return body;
  }

  static async normalize(normalizeColumns, id) {
    try {
      const res = await fetch(`${URL}/dataset/normalize/${id}`, {
        method: 'POST',
        headers: COMMON_HEADERS,
        body: JSON.stringify({
          columns: normalizeColumns,
          id: id
        })
      });
      const body = await res.json();
      return body;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async visualize(visualizeColumns, id) {
    try {
      const res = await fetch(`${URL}/dataset/visualize_data/${id}`, {
        method: 'POST',
        headers: COMMON_HEADERS,
        body: JSON.stringify({
          columns: visualizeColumns,
          id: id
        })
      });
      const body = await res.json();
      return body;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async Imputation(ImputationColumns, ImputationType, id) {
    const res = await fetch(`${URL}/dataset/imputation/${id}`, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify({
        columns: ImputationColumns,
        type: ImputationType,
        id: id
      })
    });
    const body = await res.json();
    return body;
  }

  static async download(fileType, id) {
    try {
      const res = await fetch(`${URL}/dataset/download/${id}`, {
        method: 'POST',
        headers: COMMON_HEADERS,
        body: JSON.stringify({
          file_type: fileType,
          id: id
        })
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `dataset_${id}.${fileType}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  }

  static async delete_dataset(id) {
    const res = await fetch(`${URL}/dataset/delete/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id: id })
    });
    const json = await res.json();
    return json;
  }
}
