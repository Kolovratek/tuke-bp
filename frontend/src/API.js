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
      body: JSON.stringify({ columnsToRemove: dropColumns, id })
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
        id
      })
    });
    const body = await res.json();
    return body;
  }

  static async label(labelColumns, id) {
    const res = await fetch(`${URL}/dataset/label/${id}`, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify({
        columns: labelColumns,
        id
      })
    });
    const body = await res.json();
    return body;
  }

  static async normalize(id) {
    try {
      const res = await fetch(`${URL}/dataset/normalize/${id}`, {
        method: 'POST',
        headers: COMMON_HEADERS,
        body: JSON.stringify({
          id
        })
      });
      const body = await res.json();
      return body;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async split(id) {
    try {
      const res = await fetch(`${URL}/dataset/split/${id}`, {
        method: 'POST',
        headers: COMMON_HEADERS,
        body: JSON.stringify({
          id
        })
      });
      const body = await res.json();
      return body;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async visualizeTsne(id) {
    try {
      const res = await fetch(`${URL}/dataset/visualize_data_tsne/${id}`, {
        method: 'POST',
        headers: COMMON_HEADERS,
        body: JSON.stringify({
          id
        })
      });
      const body = await res.json();
      return body;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async visualizePca(id) {
    try {
      const res = await fetch(`${URL}/dataset/visualize_data_pca/${id}`, {
        method: 'POST',
        headers: COMMON_HEADERS,
        body: JSON.stringify({
          id
        })
      });
      const body = await res.json();
      return body;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async Imputation(ImputationType, id) {
    const res = await fetch(`${URL}/dataset/imputation/${id}`, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify({
        type: ImputationType,
        id
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
          id
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
      body: JSON.stringify({ id })
    });
    const json = await res.json();
    return json;
  }
}
