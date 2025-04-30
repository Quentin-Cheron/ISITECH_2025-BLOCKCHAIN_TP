# Guide d'utilisation de la Blockchain P2P

Ce guide vous explique comment démarrer et utiliser votre réseau blockchain P2P.

## Démarrage du réseau

### Lancer deux nœuds pour former un réseau P2P

```bash
# Terminal 1 - Premier nœud
PORT=3001 P2P_PORT=6001 PEERS=ws://localhost:6002 npm start
```

```bash
# Terminal 2 - Second nœud
PORT=3002 P2P_PORT=6002 PEERS=ws://localhost:6001 npm start
```

## Interagir avec la blockchain

### Miner un nouveau bloc

Pour ajouter des données à la blockchain en minant un nouveau bloc :

```bash
curl -X POST http://localhost:3001/mine \
  -H "Content-Type: application/json" \
  -d '{"data":"test"}'
```

### Consulter la blockchain

Pour voir tous les blocs de la chaîne :

```bash
curl http://localhost:3001/blocks
```
