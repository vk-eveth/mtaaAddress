# MtaaAddress

## Project Overview

MtaaAddress is a digital addressing system designed to provide reliable and unique postal addresses for informal settlements and underserved urban areas. The system bridges the gap between traditional addressing challenges and modern digital infrastructure by enabling accurate location identification, improving delivery services, emergency response, and local governance.

This project focuses on empowering communities in Tanzania and similar regions by creating scalable, easy-to-use digital addresses linked to map data and household information.

---

## Features

- Unique digital address generation based on street landmarks and zones
- Map-based visualization using OpenStreetMap
- QR code generation for each address to facilitate sharing and scanning
- Resident registration with household and contact details
- API backend to support integration with delivery and emergency services

---

## Technology Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** Django, Django REST Framework  
- **Database:** PostgreSQL  
- **Mapping:** Leaflet.js, OpenStreetMap  
- **QR Codes:** Python `qrcode` library, JavaScript integrations  

---

## Setup & Installation

### Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL
- Git

### Backend Setup

1. Clone the repository:
    ```bash
    git clone git@github.com:vk-eveth/mtaaAddress.git
    cd mtaaAddress
    ```

2. Run the whole system with just single command
    ```bash
    docker compose up -d
    ```

### Frontend Setup

1. Navigate to the frontend folder:
    ```bash
    cd ../frontend
    ```

2. Install Node.js dependencies:
    ```bash
    npm install
    ```

3. Run the frontend server:
    ```bash
    npm start
    ```

---

## Usage

- Access the frontend at `http://localhost:3000` to interact with the system.
- Use the backend API at `http://localhost:8000/api` for integration or testing.
- Register residents and generate digital addresses with QR codes.
- Visualize addresses on the map and share them easily.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with improvements or bug fixes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

Developed by Victor Gervas Mmanda  
Email: evethvictory@gmail.com  
Phone & Whatsapp: +255626802297
GitHub: [vk-eveth](https://github.com/vk-eveth)
