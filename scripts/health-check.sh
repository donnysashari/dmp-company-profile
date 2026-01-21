#!/bin/bash

echo "🔍 DMP Database Health Check"
echo "============================="

echo -e "\n📊 Collection Counts:"
mongosh dmp-compro --eval "
  ['services', 'abouts', 'users', 'media', 'portfolios'].forEach(coll => {
    const count = db[coll].countDocuments()
    print('   ' + coll.padEnd(12) + ': ' + count + ' documents')
  })
"

echo -e "\n✅ Featured Services:"
mongosh dmp-compro --eval "
  db.services.find({featured: true}, {title: 1}).forEach(doc => {
    print('   • ' + doc.title)
  })
"

echo -e "\n👥 Active Users:"
mongosh dmp-compro --eval "
  db.users.find({}, {email: 1, role: 1}).forEach(user => {
    print('   • ' + user.email + ' (' + user.role + ')')
  })
"

echo -e "\n📈 Database Size:"
mongosh dmp-compro --eval "
  const stats = db.stats()
  print('   Storage Size: ' + (stats.storageSize / 1024 / 1024).toFixed(2) + ' MB')
  print('   Data Size: ' + (stats.dataSize / 1024 / 1024).toFixed(2) + ' MB')
"

echo -e "\n🕒 Last Updated:"
mongosh dmp-compro --eval "
  const about = db.abouts.findOne({}, {updatedAt: 1})
  if (about) print('   About page: ' + about.updatedAt)
  
  const service = db.services.findOne({}, {updatedAt: 1}, {sort: {updatedAt: -1}})
  if (service) print('   Latest service: ' + service.updatedAt)
"

echo -e "\n✅ Health check complete!"
