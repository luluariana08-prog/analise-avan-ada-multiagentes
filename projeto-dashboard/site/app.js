import { classifyByVisibleMean } from "./chart-average.mjs";

(function () {
  "use strict";

  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  const integer = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
  const svgNamespace = "http://www.w3.org/2000/svg";
  const cityFilter = document.getElementById("city-filter");
  const categoryFilter = document.getElementById("category-filter");
  const emptyState = document.getElementById("empty-state");
  const tableBody = document.getElementById("sales-table");
  let sales = [];

  function addOptions(select, values) {
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  function filteredSales() {
    return sales.filter((sale) =>
      (!cityFilter.value || sale.cidade === cityFilter.value)
      && (!categoryFilter.value || sale.categoria === categoryFilter.value)
    );
  }

  function groupValue(rows, key) {
    const totals = new Map();
    rows.forEach((row) => totals.set(key(row), (totals.get(key(row)) || 0) + Number(row.valor_venda)));
    return Array.from(totals, ([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, "pt-BR"));
  }

  function makeSvgElement(name, attributes, text) {
    const element = document.createElementNS(svgNamespace, name);
    Object.entries(attributes).forEach(([attribute, value]) => element.setAttribute(attribute, value));
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function drawChart(containerId, entries) {
    const container = document.getElementById(containerId);
    container.replaceChildren();
    if (!entries.length) {
      const message = document.createElement("p");
      message.className = "chart-empty";
      message.textContent = "Sem valores para mostrar com estes filtros.";
      container.appendChild(message);
      return;
    }

    const classifiedEntries = classifyByVisibleMean(entries);
    const width = 640;
    const left = 148;
    const plotWidth = 360;
    const rowHeight = 57;
    const height = entries.length * rowHeight + 12;
    const maxValue = Math.max(...entries.map((entry) => entry.value), 0);
    const svg = makeSvgElement("svg", {
      viewBox: `0 0 ${width} ${height}`,
      role: "img",
      "aria-label": classifiedEntries.map((entry) =>
        `${entry.label}: ${currency.format(entry.value)}, ${entry.atOrAboveMean ? "Acima da média" : "Na média ou abaixo"}`
      ).join("; "),
    });

    classifiedEntries.forEach((entry, index) => {
      const y = index * rowHeight + 8;
      const barWidth = maxValue > 0 ? Math.max(0, (entry.value / maxValue) * plotWidth) : 0;
      svg.appendChild(makeSvgElement("text", { x: 2, y: y + 17, class: "chart-label" }, entry.label));
      svg.appendChild(makeSvgElement("rect", { x: left, y, width: plotWidth, height: 24, rx: 5, class: "chart-track" }));
      svg.appendChild(makeSvgElement("rect", {
        x: left, y, width: barWidth, height: 24, rx: 5,
        class: entry.atOrAboveMean ? "chart-bar-above" : "chart-bar-at-below",
      }));
      svg.appendChild(makeSvgElement("text", {
        x: left + plotWidth + 12, y: y + 17, class: "chart-value",
      }, currency.format(entry.value)));
    });
    container.appendChild(svg);
  }

  function displayDate(isoDate) {
    const parts = isoDate.split("-");
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : isoDate;
  }

  function appendCell(row, value, className) {
    const cell = document.createElement("td");
    if (className) cell.className = className;
    cell.textContent = value;
    row.appendChild(cell);
  }

  function renderTable(rows) {
    tableBody.replaceChildren();
    const fragment = document.createDocumentFragment();
    rows.forEach((sale) => {
      const row = document.createElement("tr");
      appendCell(row, sale.id_venda, "sale-id");
      appendCell(row, displayDate(sale.data));
      appendCell(row, sale.cidade);
      appendCell(row, sale.categoria);
      appendCell(row, sale.produto);
      appendCell(row, integer.format(sale.quantidade), "numeric");
      appendCell(row, currency.format(sale.preco_unitario), "numeric");
      appendCell(row, sale.forma_pagamento);
      appendCell(row, currency.format(sale.valor_venda), "numeric");
      fragment.appendChild(row);
    });
    tableBody.appendChild(fragment);
  }

  function render() {
    const rows = filteredSales();
    const gross = rows.reduce((sum, sale) => sum + Number(sale.valor_venda), 0);
    const saleCount = new Set(rows.map((sale) => sale.id_venda)).size;
    document.getElementById("gross-total").textContent = currency.format(gross);
    document.getElementById("sale-count").textContent = integer.format(saleCount);
    document.getElementById("average-ticket").textContent = currency.format(saleCount ? gross / saleCount : 0);
    document.getElementById("row-count").textContent = `${integer.format(rows.length)} ${rows.length === 1 ? "venda" : "vendas"}`;
    emptyState.hidden = rows.length !== 0;
    renderTable(rows);
    drawChart("category-chart", groupValue(rows, (sale) => sale.categoria));
    drawChart("city-chart", groupValue(rows, (sale) => sale.cidade));
  }

  document.getElementById("clear-filters").addEventListener("click", () => {
    cityFilter.value = "";
    categoryFilter.value = "";
    render();
    cityFilter.focus();
  });
  cityFilter.addEventListener("change", render);
  categoryFilter.addEventListener("change", render);

  fetch("dados.json")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) throw new Error("Formato de dados inesperado");
      sales = data;
      addOptions(cityFilter, [...new Set(sales.map((sale) => sale.cidade))].sort((a, b) => a.localeCompare(b, "pt-BR")));
      addOptions(categoryFilter, [...new Set(sales.map((sale) => sale.categoria))].sort((a, b) => a.localeCompare(b, "pt-BR")));
      render();
    })
    .catch((error) => {
      console.error("Falha ao carregar dados do dashboard:", error);
      document.getElementById("load-error").hidden = false;
    });
}());
