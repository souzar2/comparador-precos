import express from "express";
import fetch from "node-fetch";
import cors from "cors";
const auth = 'Q4kKDVaaK0upvDqSM7FFkdila2vsBksZ'
const token = "Q4kKDVaaK0upvDqSM7FFkdila2vsBksZ";
const app = express();
app.use(cors());

app.get("/api/products", async (req, res) => {
  const { product_identifier } = req.query;
  const token = "Q4kKDVaaK0upvDqSM7FFkdila2vsBksZ";

  try {
    const response = await fetch(
      `https://api.mercadolibre.com/products/search?status=active&site_id=MLB&product_identifier=${product_identifier}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (erro) {
    console.error("Erro no proxy:", erro);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

app.listen(3001, () => console.log("Backend rodando na porta 3001"));
